from django.db.models import Q
from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Business
from .permissions import IsOwner, IsSuperuser
from .serializers import BusinessSerializer


class BusinessList(GenericAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        businesses = Business.objects.all()
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)


class BusinessCreate(CreateAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BusinessDetail(GenericAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

    # permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsOwner | IsSuperuser]

        return super().get_permissions()

    # def get(self, request, pk):
    #     business = get_object_or_404(Business, pk=pk)
    #     serializer = BusinessSerializer(business)
    #     return Response(serializer.data)
    #
    # def patch(self, request, pk):
    #     business = get_object_or_404(Business, pk=pk)
    #     serializer = BusinessSerializer(business, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    # def delete(self, request, pk):
    #     business = get_object_or_404(Business, pk=pk)
    #     business.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BusinessForCurrentUser(GenericAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [IsOwner | IsSuperuser]

    def get(self, request):
        if request.user.is_authenticated:
            businesses = Business.objects.filter(user=request.user)
            if businesses.exists():
                serializer = BusinessSerializer(businesses, many=True)
                return Response(serializer.data)
            else:
                return Response({'message': 'No businesses found for the current user'},
                                status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'message': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)


class BusinessReviewed(GenericAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        reviewed_businesses = Business.objects.exclude(average_rating=None)
        serializer = BusinessSerializer(reviewed_businesses, many=True)
        return Response(serializer.data)


class BusinessFilter(GenericAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        # Retrieve all businesses
        businesses = Business.objects.all()

        # Filter businesses based on query parameters
        country = request.GET.get('country')
        city = request.GET.get('city')
        rating = request.GET.get('rating')
        keyword = request.GET.get('keyword')

        if country is not None and country.strip():
            businesses = businesses.filter(country__iexact=country.strip())
        if city is not None and city.strip():
            businesses = businesses.filter(city__iexact=city.strip())
        if rating is not None and rating.strip():
            try:
                rating = int(rating.strip())
                businesses = businesses.filter(average_rating__gte=rating)
            except ValueError:
                # Handle the case when rating is not a valid integer
                pass
        if keyword is not None and keyword.strip():
            businesses = businesses.filter(description__icontains=keyword.strip())

        # Serialize the filtered businesses
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)

        # Serialize the filtered businesses
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)


class BusinessSearch(ListAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)

        if not search_query:
            return Business.objects.none()

        queryset = Business.objects.filter(
            Q(company_name__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(type__icontains=search_query) |
            Q(city__icontains=search_query) |
            Q(country__icontains=search_query)
        ).distinct()

        return queryset


# class BusinessByService(ListAPIView):
#     serializer_class = BusinessSerializer
#
#     def get_queryset(self):
#         queryset = Business.objects.all()
#         service_type = self.request.query_params.get('service_type', None)
#         if service_type is not None:
#             queryset = queryset.filter(services=service_type)
#         return queryset

class BusinessOperator(ListAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Business.objects.filter(services='Operator')


class BusinessInstructor(ListAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Business.objects.filter(services='Instructor')


class BusinessRepair(ListAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Business.objects.filter(services='Repair')


class BusinessBestRated(ListAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Business.objects.all().order_by('-average_rating')
        return queryset
