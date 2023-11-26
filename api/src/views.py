from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import render
from django.contrib.auth import authenticate

from .models import StudentSkill, User, Student, Employer, CareerFair, Job, Booth
from .serializers import StudentSkillSerializer, UserSerializer, StudentSerializer,\
    EmployerSerializer, CareerFairSerializer, JobSerializer, BoothSerializer


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            serializer = None
            if(user.role == 'Student'):
                student = Student.objects.get(user=user)
                serializer = StudentSerializer(student)
            elif user.role =='Employer':
                employer = Employer.objects.get(user=user)
                serializer = EmployerSerializer(employer)
            return Response({
                "auth_token": token.key,
                "role": user.role,
                "record": serializer.data,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
class StudentSignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        # Get the data from the request
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        role = request.data.get('role')
        pantehrid = request.data.get('pantehrid')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        degree = request.data.get('degree')
        major = request.data.get('major')
        grad_year = request.data.get('grad_year')

        # Create a new User instance
        user = User.objects.create_user(username=username, password=password, email=email,role=role)

        # Create a new Student instance associated with the User instance
        student = Student.objects.create(user=user, pantehrid=pantehrid, first_name=first_name, last_name=last_name, degree=degree, major=major, grad_year=grad_year)

        # Save the User and Student instances to the database
        user.save()
        student.save()

        return Response({"detail": "Student created successfully, please login.", "student_id": student.id}, status=status.HTTP_201_CREATED)


class StudentSkillInsertView(generics.CreateAPIView):
    queryset = StudentSkill.objects.all()
    serializer_class = StudentSkillSerializer

    def create(self, request, *args, **kwargs):
        # Get the data from the request
        student_id = request.data.get('student_id')
        skills = request.data.get('password')

        # Get Student from database
        student = Student.objects.get(id=student_id)
        if student is None:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Insert skills into Student
        student_skills = StudentSkills.objects.create(student=student, skills=skills)
        student_skills.save()
     
        return Response({"detail": "Student skills created successfully.", "skill_id": skills.id}, status=status.HTTP_201_CREATED)


class StudentSkillUpdateView(generics.UpdateAPIView):
    queryset = StudentSkill.objects.all()
    serializer_class = StudentSkillSerializer

    def update(self, request, *args, **kwargs):
        # Get the data from the request
        student_id = request.data.get('student_id')
        skills = request.data.get('skills')

        # Get the StudentSkills instance
        student_skills = StudentSkills.objects.filter(
            student__id=student_id).first()
        if student_skills is None:
            return Response({"detail": "Student skills not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update the skills
        student_skills.skills = skills
        student_skills.save()

        return Response({"detail": "Student skills updated successfully."}, status=status.HTTP_200_OK)
    

class StudentSkillsView(generics.RetrieveAPIView):
    queryset = StudentSkill.objects.all()
    serializer_class = StudentSkillSerializer

    def retrieve(self, request, *args, **kwargs):
        # Get the student_id from the URL parameters
        student_id = kwargs.get('student_id')

        # Get the StudentSkills instance
        student_skills = StudentSkills.objects.filter(
            student__id=student_id).first()
        if student_skills is None:
            return Response({"detail": "No student skills currently available."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the StudentSkills instance
        serializer = self.get_serializer(student_skills)

        return Response(serializer.data, status=status.HTTP_200_OK)


class StudentUpdateView(generics.UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def update(self, request, *args, **kwargs):
        # Get the data from the request
        student_id = kwargs.get('pk')
        pantehrid = request.data.get('pantehrid')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        degree = request.data.get('degree')
        major = request.data.get('major')
        grad_year = request.data.get('grad_year')

        # Get the Student instance
        student = Student.objects.filter(id=student_id).first()
        if student is None:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update the student information
        student.pantehrid = pantehrid
        student.first_name = first_name
        student.last_name = last_name
        student.degree = degree
        student.major = major
        student.grad_year = grad_year
        student.save()

        # Serialize the updated student instance
        serializer = self.get_serializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class EmployerSignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        # Get the data from the request
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        role = request.data.get('role')
        company_name = request.data.get('name')
        industry = request.data.get('industry')
        contact_person_name = request.data.get('contact')

        # Create a new User instance
        user = User.objects.create_user(
            username=username, password=password, email=email, role=role)

        # Create a new Employer instance associated with the User instance
        employer = Employer.objects.create(user=user, company_name=company_name, industry=industry,contact_person_name=contact_person_name)

        # Save the User and Student instances to the database
        user.save()
        employer.save()

        return Response({"detail": "Employer created successfully, please login.", "employer_id": employer.id}, status=status.HTTP_201_CREATED)
    
# User Views
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Student Views
class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentSkills(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentSkill.objects.all()
    serializer_class = StudentSerializer


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
# Employer Views
class EmployerList(generics.ListCreateAPIView):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

class EmployerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

# CareerFair Views
class CareerFairList(generics.ListCreateAPIView):
    queryset = CareerFair.objects.all()
    serializer_class = CareerFairSerializer

class CareerFairDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CareerFair.objects.all()
    serializer_class = CareerFairSerializer

# Job Views
class JobList(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

# Booth Views
class BoothList(generics.ListCreateAPIView):
    queryset = Booth.objects.all()
    serializer_class = BoothSerializer

class BoothDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booth.objects.all()
    serializer_class = BoothSerializer

