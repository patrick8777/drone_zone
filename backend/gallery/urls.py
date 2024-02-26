from django.urls import path

from .views import GalleryCreate, AllGalleries, RetrieveUpdateDeleteGallery, GalleryFavouriteList, GalleryPrivateList

urlpatterns = [
    path('', AllGalleries.as_view(), name='galleries-list'),
    path('create/', GalleryCreate.as_view(), name='gallery-create'),
    path('<int:pk>/', RetrieveUpdateDeleteGallery.as_view(), name='single-gallery'),
    path('favourite/', GalleryFavouriteList.as_view(), name='user-favourite-gallery'),
    path('private/', GalleryPrivateList.as_view(), name='user-private-gallery'),
]
