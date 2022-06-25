from re import A
from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.urls import reverse

# Create your views here.

articles = {
    "sports": "Sports View",
    "politics": "Politics View",
    "finance": "Finance View"
}

def parse_view(request, topic):
    try:
        result = articles[topic]
        return HttpResponse(result)
    except:
        raise Http404("404 Page Not Found")

# REDIRECTION -> domain.com/app1/0 --> domain.com/app1/sports , etc..
def parse_view_viaNum(request, pageNum):
    topic = list(articles.keys())[pageNum]
    return HttpResponseRedirect(reverse('topic-page', args = [topic]))
    #redirection not working for index 0 in this version - prolly deprecated?

def arithmetricSum(reuqest, num1, num2):
    results = f"{num1} + {num2} = {num1+num2}"
    return HttpResponse(str(results))

def home_view(request):
    return render(request, 'app1/example.html')