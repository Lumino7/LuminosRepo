from django import forms
from .models import Post, Comment

# custom class inheriting from ModelForm.
# expanded from SO: https://stackoverflow.com/questions/29716023/add-class-to-form-field-django-modelform
class BootstrapForm(forms.ModelForm): #Copied from my Project2 Commerce
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Add Bootstrap class to all form fields
        for field_name, field in self.fields.items(): #for each form field:
            current_classes = field.widget.attrs.get('class', '') #get it's widget class attributes
            merged_classes = f'{current_classes} form-control'.strip() #add 'form-control' to it
            field.widget.attrs['class'] = merged_classes #update the field widget class attributes

class PostForm(BootstrapForm):
    content = forms.CharField(widget=forms.Textarea(attrs={'rows': 4}), label='')

    class Meta:
        model = Post
        fields = ['content']


class CommentForm(BootstrapForm):
    content = forms.CharField(widget=forms.Textarea(attrs={'rows': 4}), label='Comment')

    class Meta:
        model = Comment
        fields = ['content']
