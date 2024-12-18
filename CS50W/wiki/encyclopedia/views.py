from django.shortcuts import render, redirect

from django.http import HttpResponse

from . import util

from django.views.decorators.csrf import csrf_protect, csrf_exempt

import random

import markdown2

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def showcontent(request, title):
    content = util.get_entry(title)
    if content:
        content = markdown2.markdown(content)
        return render(request, "encyclopedia/content.html", {
            "title": title, "content": content
    })
    else: return HttpResponse("Page not found")

def editcontent(request, title):
    if request.method == "GET":
        content = util.get_entry(title)
        if content:
            return render(request, "encyclopedia/edit.html", {
                "title": title, "content": content
        })
        else: return HttpResponse("Page not found")
    elif request.method == "POST":
        content = request.POST.get("content")
        util.save_entry(title, content)
        return redirect("showcontent", title)
    else: return HttpResponse("Page not found")


@csrf_protect
def search(request):
    title = request.POST.get("q")
    content = util.get_entry(title)
    if content:
        return redirect("showcontent", title)
    else:
        entries = util.list_entries()
        results = []
        for entry in entries:
            if title.lower() in entry.lower():
                results.append(entry)
        return render(request, "encyclopedia/index.html", {
            "entries": results
        })

@csrf_protect
def new(request):
    if request.method == "GET":
        return render(request, "encyclopedia/new.html")
    elif request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        if util.get_entry(title):
            return render(request, "encyclopedia/new.html", {
                "title": title,
                "content": content,
                "error_message": "An entry with this title already exists."
            })
        else:
            util.save_entry(title, content)
            return redirect("showcontent", title)

def randompage(request):
    return redirect("showcontent", random.choice(util.list_entries()))
