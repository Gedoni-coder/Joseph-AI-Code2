from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('business_forecast', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to='business_forecast/documents/%Y/%m/%d/')),
                ('file_type', models.CharField(max_length=50)),
                ('file_size', models.IntegerField()),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            options={
                'ordering': ['-uploaded_at'],
            },
        ),
    ]
