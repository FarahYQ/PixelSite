# Generated by Django 2.1.7 on 2019-06-04 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0003_auto_20190604_0846'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='lat',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='lng',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
    ]
