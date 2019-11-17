# Generated by Django 2.2.7 on 2019-11-17 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('supplier', '0001_initial'),
        ('customer', '0001_initial'),
        ('product', '0001_initial'),
        ('branch', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(auto_now_add=True)),
                ('close_date', models.DateTimeField(blank=True, null=True)),
                ('status', models.CharField(choices=[('done', 'done'), ('active', 'active'), ('remained', 'remained')], default='active', max_length=32)),
                ('discount', models.FloatField(default=0)),
                ('used_points', models.FloatField(default=0)),
                ('bill_image', models.ImageField(blank=True, null=True, upload_to='')),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='bills', to='branch.Branch')),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='bills', to='customer.Customer')),
            ],
        ),
        migrations.CreateModel(
            name='Cheque',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(unique=True)),
                ('bank', models.CharField(max_length=32)),
                ('issue_date', models.DateField(null=True)),
                ('expiry_date', models.DateField()),
                ('amount', models.IntegerField()),
                ('status', models.CharField(choices=[('تسویه', 'تسویه'), ('مانده', 'مانده')], default='مانده', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(blank=True, null=True)),
                ('amount', models.IntegerField()),
                ('type', models.CharField(choices=[('cheque', 'cheque'), ('cash', 'cash'), ('card', 'card')], default='نقد', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='SpecialDiscount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percentage', models.IntegerField(default=0)),
                ('straight', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='SupplierBill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('done', 'done'), ('active', 'active')], default='active', max_length=32)),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='bills', to='supplier.Supplier')),
            ],
        ),
        migrations.CreateModel(
            name='CustomerCheque',
            fields=[
                ('cheque_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='bill.Cheque')),
            ],
            bases=('bill.cheque',),
        ),
        migrations.CreateModel(
            name='CustomerPayment',
            fields=[
                ('payment_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='bill.Payment')),
            ],
            bases=('bill.payment',),
        ),
        migrations.CreateModel(
            name='OurPayment',
            fields=[
                ('payment_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='bill.Payment')),
            ],
            bases=('bill.payment',),
        ),
        migrations.CreateModel(
            name='SpecialProductDiscount',
            fields=[
                ('specialdiscount_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='bill.SpecialDiscount')),
            ],
            bases=('bill.specialdiscount',),
        ),
        migrations.CreateModel(
            name='SpecialProductsDiscount',
            fields=[
                ('specialdiscount_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='bill.SpecialDiscount')),
            ],
            bases=('bill.specialdiscount',),
        ),
        migrations.CreateModel(
            name='SupplierBillItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('rejected', models.BooleanField(default=False)),
                ('raw_price', models.FloatField()),
                ('currency_price', models.FloatField(default=1)),
                ('currency', models.CharField(choices=[('ریال', 'ریال'), ('درهم', 'درهم'), ('دلار', 'دلار'), ('روپیه', 'روپیه'), ('یوان', 'یوان')], default='ریال', max_length=20)),
                ('bill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bills', to='bill.SupplierBill')),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, related_name='supplier_bill_item', to='product.Product')),
            ],
        ),
        migrations.CreateModel(
            name='OurCheque',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='cheques', to='supplier.Supplier')),
            ],
        ),
        migrations.CreateModel(
            name='BillItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('discount', models.FloatField(default=0)),
                ('end_of_roll', models.BooleanField(default=False)),
                ('end_of_roll_amount', models.FloatField(default=0)),
                ('rejected', models.BooleanField(default=False)),
                ('bill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='bill.Bill')),
                ('product', models.ManyToManyField(related_name='bill_items', to='product.Product')),
            ],
        ),
    ]
