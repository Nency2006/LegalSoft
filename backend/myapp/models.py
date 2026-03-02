from django.db import models

# Create your models here.
class user(models.Model):
    fullname = models.CharField(max_length=150)
    email = models.CharField(max_length=150)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=20)
    phonenumber = models.CharField(20)
    image = models.ImageField(upload_to='image')


class Client(models.Model):
    c_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=15)

    dob = models.DateField(null=True, blank=True)   # ✅ FIX

    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=150)

    address = models.TextField()
    city = models.CharField(max_length=50, default="Surat")
    state = models.CharField(max_length=50, default="Gujarat")
    pincode = models.CharField(max_length=10)

    identity_proof = models.ImageField(upload_to="client_ids/", null=True, blank=True)

    # Case Details
    case_type = models.CharField(max_length=100, default="Civil")
    opposite_party = models.CharField(max_length=100)
    case_description = models.TextField(blank=True, null=True, default="No description")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.c_name


class Advocate(models.Model):
    # Personal Info
    name = models.CharField(max_length=100)
    gender_choices = [('Male','Male'), ('Female','Female'), ('Other','Other')]
    gender = models.CharField(max_length=10, choices=gender_choices)
    dob = models.DateField(null=True, blank=True)
    photo = models.ImageField(upload_to="advocate_photos/", null=True, blank=True)
    
    # Contact Info
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, unique=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=50, default="Surat")
    state = models.CharField(max_length=50, default="Gujarat")
    pincode = models.CharField(max_length=10, blank=True, null=True)

    # Professional Info
    bar_council_no = models.CharField(max_length=50, unique=True)
    specialization_choices = [
        ('Criminal', 'Criminal'),
        ('Civil', 'Civil'),
        ('Corporate', 'Corporate'),
        ('Family', 'Family'),
        ('IP', 'Intellectual Property'),
        ('Employment', 'Employment'),
        ('Cyber', 'Cyber Law'),
        ('Other', 'Other')
    ]
    specialization = models.CharField(max_length=50, choices=specialization_choices)
    experience_years = models.IntegerField(default=0)
    join_date = models.DateField(auto_now_add=True)
    
    # System Info
    user_login = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=True)
   

    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name