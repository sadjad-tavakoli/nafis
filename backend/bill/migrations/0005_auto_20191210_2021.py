# Generated by Django 2.2.7 on 2019-12-10 16:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_create_product_features'),
        ('bill', '0004_merge_20191210_0841'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='billitem',
            name='product',
        ),
        migrations.AddField(
            model_name='billitem',
            name='product',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='bill_items', to='product.Product'),
            preserve_default=False,
        ),
    ]