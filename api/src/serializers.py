from rest_framework import serializers
from .models import Student, StudentSkill, User, Employer, CareerFair, Job, Booth


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class StudentSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSkill
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = "__all__"


class CareerFairSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerFair
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class BoothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booth
        fields = "__all__"
