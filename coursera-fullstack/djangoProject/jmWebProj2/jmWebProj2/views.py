from django.shortcuts import render

def pageNotFound404(request, exception):
    return render(request, 'error_404.html', status = 404)