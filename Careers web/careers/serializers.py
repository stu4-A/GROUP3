from rest_framework import serializers
from django.contrib.auth.models import User
from .models import StudentProfile, StudentGrade, CareerOpportunity, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email')

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ('user','role')

class StudentGradeSerializer(serializers.ModelSerializer):
    grade = serializers.ReadOnlyField()
    grade_points = serializers.ReadOnlyField()
    class Meta:
        model = StudentGrade
        fields = ('id','semester','subject_name','credit_units','score','grade','grade_points','recorded_at')

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    grades = StudentGradeSerializer(many=True, read_only=True)
    class Meta:
        model = StudentProfile
        fields = ('user','skills','enrolled_subjects','cgpa','grades')

class CareerOpportunitySerializer(serializers.ModelSerializer):
    posted_by = UserSerializer()
    class Meta:
        model = CareerOpportunity
        fields = ('id','company','role','deadline','link','field','description','posted_by')
