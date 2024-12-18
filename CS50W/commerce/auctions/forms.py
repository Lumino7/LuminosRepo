from django import forms
from .models import CATEGORY_CHOICES, Listing, Bid, Comment

# custom class inheriting from ModelForm.
# expanded from SO: https://stackoverflow.com/questions/29716023/add-class-to-form-field-django-modelform
class BootstrapForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Add Bootstrap class to all form fields
        for field_name, field in self.fields.items(): #for each form field:
            current_classes = field.widget.attrs.get('class', '') #get it's widget class attributes
            merged_classes = f'{current_classes} form-control'.strip() #add 'form-control' to it
            field.widget.attrs['class'] = merged_classes #update the field widget class attributes

class ListingForm(BootstrapForm):
    class Meta:
        model = Listing
        fields = ['name', 'price', 'description', 'image_URL', 'category']
        labels = {
            'image_URL': 'Image URL (optional)'
        }

    category = forms.ChoiceField(choices=list(
        CATEGORY_CHOICES.items()), required=False, label='Category (optional)')


class BidForm(BootstrapForm):
    offer = forms.IntegerField(widget=forms.NumberInput(attrs={'class': 'w-100'}), label='')

    class Meta:
        model = Bid
        fields = ['offer']

    def clean(self):
        cleaned_data = super().clean()
        offer = cleaned_data.get('offer')

        if offer:
            highest_bid = self.instance.listing.get_highest_bid()

            if highest_bid is not None and offer <= highest_bid.offer:
                raise forms.ValidationError("Your offer must be greater than the highest bid")
            elif offer <= self.instance.listing.price:
                raise forms.ValidationError("Your offer must be greater than the listing price")

        return cleaned_data

class CommentForm(BootstrapForm):
    comment= forms.CharField(widget=forms.Textarea(attrs={'rows': 4}), label='')

    class Meta:
        model = Comment
        fields = ['comment']
