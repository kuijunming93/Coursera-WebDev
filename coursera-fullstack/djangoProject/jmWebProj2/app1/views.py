from django.shortcuts import render

# Create your views here.
def home_view(request):
    return render(request, 'app1/home.html')
    
def variable_view(request):
    my_var = {
        "firstName": "Jun Ming",
        "lastName": "Kui",
        "details": [1,2,3],
        "traits": {
            "gender":"male",
            "age": "old"
            },
        "acknowledgeUser": True
    }
    return render(request, 'app1/variable.html', context = my_var)