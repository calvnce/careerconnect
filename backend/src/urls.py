from django.urls import path

from .views import EmployerSignUpView, StudentSkillUpdateView, StudentSkillInsertView, \
        StudentSkillsView, StudentUpdateView, UserList, UserDetail, StudentSignUpView, LoginView, StudentList, \
        StudentDetail, EmployerList, EmployerDetail, CareerFairList, CareerFairDetail, \
        JobList, JobDetail, BoothList, BoothDetail

urlpatterns = [
    path('', LoginView.as_view(), name='login'),
    path('users/', UserList.as_view(), name='user_list'),
    
    path('login/', LoginView.as_view(), name='login'),
    path('students/', StudentList.as_view(), name='student_list'),
    path('students/<str:pk>/', StudentDetail.as_view(), name='student_detail'),
    path('employers/', EmployerList.as_view(), name='employer_list'),
    path('employers/<str:pk>/', EmployerDetail.as_view(), name='employer_detail'),
    path('careerfairs/', CareerFairList.as_view(), name='careerfair_list'),
    path('careerfairs/<str:pk>/', CareerFairDetail.as_view(), name='careerfair_detail'),
    path('jobs/', JobList.as_view(), name='job_list'),
    path('jobs/<str:pk>/', JobDetail.as_view(), name='job_detail'),
    path('booths/', BoothList.as_view(), name='booth_list'),
    path('booths/<str:pk>/', BoothDetail.as_view(), name='booth_detail'),
    path('users/<str:pk>/', UserDetail.as_view(), name='user_detail'),
    path('users/<str:pk>/', UserDetail.as_view(), name='user_detail'),
    path('signup/employer/', EmployerSignUpView.as_view(), name='employer_signup'),
    path('signup/student/', StudentSignUpView.as_view(), name='student_signup'),
    path('student/<int:pk>/update/', StudentUpdateView.as_view(), name='student_update'),
    path('student/skills/insert/', StudentSkillInsertView.as_view(), name='student_skills_insert'),
    path('student/skills/update/', StudentSkillUpdateView.as_view(), name='student_skills_update'),
    path('student/skills/<int:student_id>/', StudentSkillsView.as_view(), name='student_skills'),]
