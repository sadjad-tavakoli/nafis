# Generated by Django 2.2.7 on 2019-12-10 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bill', '0005_auto_20191210_2021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billitem',
            name='end_of_roll_amount',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]