from django.shortcuts import render,redirect
from myapp.models import *
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth import login,authenticate

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Client
from .serializers import ClientSerializer

import pandas as pd
from django.http import JsonResponse

from .models import Advocate
from .serializers import AdvocateSerializer

# Create your views here.
def reg(request):
    if request.method == 'POST':
        fullname = request.POST['fullname']
        email = request.POST['email']
        password = request.POST['password']
        role = request.POST['role']
        phonenumber = request.POST['phonenumber']
        image = request.FILES.get('image')
        u = user.objects.create(fullname=fullname,email=email,role=role,phonenumber=phonenumber,image=image)
        u.password = make_password(password)
        u.save()
    return render(request,'reg.html')
        
def login_data(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            u = user.objects.get(email=email)

            if check_password(password, u.password):
                request.session['user_id'] = u.id
                request.session['user_role'] = u.role
                return redirect('home')
            else:
                return render(request, 'login.html', {"err": "Invalid email or password"})

        except user.DoesNotExist:
            return render(request, 'login.html', {"err": "Invalid email or password"})

    return render(request, 'login.html')

def home(request):
    return render(request,"home.html")


#client views: 
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def client_api(request, id=None):

    # 🔥 GET ALL OR SINGLE
    if request.method == 'GET':
        if id:
            try:
                client = Client.objects.get(id=id)
                serializer = ClientSerializer(client)
                return Response(serializer.data)
            except Client.DoesNotExist:
                return Response({"error": "Client not found"})
        else:
            clients = Client.objects.all().order_by('-id')
            serializer = ClientSerializer(clients, many=True)
            return Response(serializer.data)


    # 🔥 POST → ADD CLIENT
    if request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


    # 🔥 PUT → UPDATE
    if request.method == 'PUT':
        try:
            client = Client.objects.get(id=id)
        except Client.DoesNotExist:
            return Response({"error": "Client not found"})

        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


    # 🔥 DELETE
    if request.method == 'DELETE':
        try:
            client = Client.objects.get(id=id)
            client.delete()
            return Response({"message": "Deleted"})
        except Client.DoesNotExist:
            return Response({"error": "Client not found"})
        

@api_view(['POST'])
def bulk_upload_clients(request):
    file = request.FILES.get('file')
    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    # Excel read
    try:
        df = pd.read_excel(file)
    except Exception as e:
        return Response({"error": f"Invalid file format: {str(e)}"}, status=400)

    # Loop through rows
    for _, row in df.iterrows():
        Client.objects.create(
            c_name=row.get("c_name", ""),
            gender=row.get("gender", ""),
            dob=row.get("dob", None),
            phone=row.get("phone", ""),
            email=row.get("email", ""),
            address=row.get("address", ""),
            city=row.get("city", ""),
            state=row.get("state", ""),
            pincode=row.get("pincode", ""),
            case_type=row.get("case_type", ""),
            opposite_party=row.get("opposite_party", ""),
            case_description=row.get("case_description", ""),
        )

    return Response({"message": "Bulk upload successful"})


#advocate view:::
@api_view(['GET', 'POST'])
def advocate_list_create(request):
    if request.method == 'GET':
        advocates = Advocate.objects.all()
        serializer = AdvocateSerializer(advocates, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = AdvocateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# GET single / PUT update / DELETE
@api_view(['GET', 'PUT', 'DELETE'])
def advocate_detail(request, pk):
    try:
        advocate = Advocate.objects.get(pk=pk)
    except Advocate.DoesNotExist:
        return Response({"error": "Advocate not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AdvocateSerializer(advocate)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AdvocateSerializer(advocate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        advocate.delete()
        return Response({"message": "Advocate deleted"}, status=status.HTTP_204_NO_CONTENT)