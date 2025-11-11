from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import StudentProfileSerializer, CareerOpportunitySerializer, UserProfileSerializer
from .models import StudentProfile, CareerOpportunity, UserProfile, StudentGrade
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role', 'student')

    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    user.profile.role = role
    user.profile.save()

    return Response({"detail": "User Registered Successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user
    profile = None
    try:
        profile = user.userprofile
    except UserProfile.DoesNotExist:
        return Response({'detail':'Profile not found'}, status=404)
    data = {'profile': {'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email, 'role': profile.role}}
    if profile.role == 'admin' or user.is_staff:
        # summary counts
        data['summary'] = {
            'total_users': User.objects.count(),
            'total_students': UserProfile.objects.filter(role='student').count(),
            'total_lecturers': UserProfile.objects.filter(role='lecturer').count(),
            'total_opportunities': CareerOpportunity.objects.count(),
        }
    elif profile.role == 'student':
        sp = StudentProfile.objects.filter(user=user).first()
        if sp:
            data['student'] = StudentProfileSerializer(sp).data
    elif profile.role == 'lecturer':
        # lecturer sees their posted opportunities and applicants
        ops = CareerOpportunity.objects.filter(posted_by=user)
        data['opportunities'] = CareerOpportunitySerializer(ops, many=True).data
    return Response(data)
