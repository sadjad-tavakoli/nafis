"""nafis URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers

from bill.views import BillsViewSet, BillItemViewSet, CustomerPaymentViewSet, SupplierBillsViewSet, \
    SupplierBillItemViewSet, CustomerChequeViewSet, OurChequeViewSet
from customer.views import CustomersViewSet, GetCustomerFieldsApiView
from nafis.views import LoginAPIView
from product.views import ProductIdCreateApiView, ProductViewSet, ProductFieldsOptionsView
from supplier.views import SupplierViewSet

router = routers.DefaultRouter()
router.register(r'bills', BillsViewSet, 'bill')
router.register(r'supplier-bills', SupplierBillsViewSet, 'supplier-bill')
router.register(r'supplier-bill-item', SupplierBillItemViewSet, 'supplier-bill-item')
router.register(r'suppliers', SupplierViewSet, 'suppliers')
router.register(r'bill-items', BillItemViewSet, 'bill-item')
router.register(r'products', ProductViewSet, 'product')
router.register(r'customer-cheque', CustomerChequeViewSet, 'customer-cheque')
router.register(r'our-cheque', OurChequeViewSet, 'our-cheque')
router.register(r'payments', CustomerPaymentViewSet, 'customer-payments')
router.register(r'customers', CustomersViewSet, 'customers')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/', LoginAPIView.as_view(), name='login'),
    url(r'^api/product-id/', ProductIdCreateApiView.as_view(), name='create-product-id'),
    url(r'^api/product-fields/', ProductFieldsOptionsView.as_view(), name='product-fields'),
    url(r'^api/customer-fields/', GetCustomerFieldsApiView.as_view(), name='customer-types'),
    path('api/', include(router.urls)),
    url(r'^$', TemplateView.as_view(template_name="customer/index.html"), name='client'),
    url(r'^(?:.*)/?$', TemplateView.as_view(template_name="customer/index.html"))
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
