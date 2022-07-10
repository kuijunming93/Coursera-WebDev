from django.shortcuts import render
from . import models

# Create your views here.
def view(request):
    return render(request, 'customerApp/view.html', context={"people":models.Person.objects.all()})

def add(request):
    if request.POST:
        print(request.POST)
    return render(request, 'customerApp/add.html')

def delete(request):
    return render(request, 'customerApp/delete.html')