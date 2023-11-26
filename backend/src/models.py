from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=25, unique=True)
    email = models.EmailField(max_length=55)
    role = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        db_table = "users"

    # Add related_name arguments to the groups and user_permissions fields
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="customuser_set",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="customuser_set",
        related_query_name="user",
    )



class Student(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="students",
        to_field='username', db_column='username'
    )
    pantehrid = models.CharField(max_length=150)
    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    degree = models.CharField(max_length=100, null=False)
    major = models.CharField(max_length=100, null=False)
    grad_year = models.IntegerField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "students"

class StudentSkill(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        to=Student, on_delete=models.CASCADE, related_name="skills",
        db_column='student_id'
    )
    skill = models.CharField(max_length=500, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "student_skills"
        
class Employer(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="employers",
        to_field='username', db_column='username'
    )
    company_name = models.CharField(max_length=65)
    industry = models.EmailField(max_length=55)
    contact_person_name = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "employers"

class CareerFair(models.Model):
    id = models.AutoField(primary_key=True)
    fair_name = models.CharField(max_length=65)
    start_date = models.DateField(null=False)
    end_date = models.DateField(null=False)
    start_time = models.TimeField(null=False)
    end_time = models.DateField(null=False)
    venue = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=300, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "career_fairs"

class Job(models.Model):
    id = models.AutoField(primary_key=True)
    fair = models.ForeignKey(
        to=CareerFair, on_delete=models.CASCADE, related_name="jobs",
        db_column='fair_id'
    )
    employer = models.ForeignKey(
        to=Employer, on_delete=models.CASCADE, related_name="jobs",
        name='employer_id'
    )
    job_type = models.CharField(max_length=50, null=False)
    position = models.CharField(max_length=125, null=False)
    location = models.CharField(max_length=75, null=False)
    skills = models.CharField(max_length=165, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "jobs"

class Booth(models.Model):
    id = models.AutoField(primary_key=True)
    fair = models.ForeignKey(
        to=CareerFair, on_delete=models.CASCADE, related_name="booths",
        db_column='fair_id'
    )
    employer = models.ForeignKey(
        to=Employer, on_delete=models.CASCADE, related_name="booths"
    )
    job_type = models.CharField(max_length=50, null=False)
    position = models.CharField(max_length=125, null=False)
    location = models.CharField(max_length=75, null=False)
    skills = models.CharField(max_length=165, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "booths"
