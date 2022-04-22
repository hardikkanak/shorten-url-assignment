from django.db import models

# Create your models here.
class GeneratedURL(models.Model):
    original_url = models.TextField()
    shortener_link = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "generated_url"