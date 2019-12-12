from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.viewsets import ModelViewSet

from bill.permissions import LoginRequired
from customer.models import Customer
from customer.serializers import CustomerSerializer
from nafis.paginations import PaginationClass
from nafis.views import NafisBase


class CustomersViewSet(NafisBase, ModelViewSet):
    serializer_class = CustomerSerializer
    permission_classes = (LoginRequired,)
    queryset = Customer.objects.all()
    non_updaters = ["cashier", "salesperson", "accountant", "storekeeper"]
    non_destroyers = ["cashier", "salesperson", "accountant", "storekeeper"]
    pagination_class = PaginationClass

    @action(methods=['GET'], detail=False, url_path='phone')
    def get_customer_using_phone(self, request, *kwargs):
        phone_number = self.request.query_params.get('phone_number', None)
        try:
            customer = Customer.objects.get(phone_number=phone_number)
            return Response(CustomerSerializer(customer).data)
        except ObjectDoesNotExist:
            return Response({'چنین کاربری یافت نشد.'}, status=HTTP_404_NOT_FOUND)