from rest_framework import serializers


class JobSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    company_id = serializers.IntegerField()
    company_name = serializers.CharField()
    title = serializers.CharField()
    role_category = serializers.CharField()
    posted_on = serializers.CharField()
    apply_link = serializers.URLField()


class CompanySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    address = serializers.CharField()
    city = serializers.CharField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    logo = serializers.CharField(allow_blank=True)
    jobs = JobSerializer(many=True, read_only=True)


class RoleCategorySerializer(serializers.Serializer):
    name = serializers.CharField()
