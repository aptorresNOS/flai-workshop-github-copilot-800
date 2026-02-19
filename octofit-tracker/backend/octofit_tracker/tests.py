from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone


class UserAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            name='Test User',
            email='testuser@merriweather.com',
            team='Blue Team'
        )

    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'name': 'Jane Doe', 'email': 'jane@merriweather.com', 'team': 'Red Team'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_detail(self):
        response = self.client.get(f'/api/users/{self.user.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'testuser@merriweather.com')


class TeamAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(
            name='Blue Team',
            description='The blue fitness team'
        )

    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {'name': 'Red Team', 'description': 'The red fitness team'}
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.activity = Activity.objects.create(
            user_email='testuser@merriweather.com',
            activity_type='Running',
            duration=30,
            distance=5.0,
            calories=300,
            date=timezone.now()
        )

    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        data = {
            'user_email': 'jane@merriweather.com',
            'activity_type': 'Cycling',
            'duration': 45,
            'distance': 15.0,
            'calories': 400,
            'date': timezone.now().isoformat()
        }
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LeaderboardAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.entry = Leaderboard.objects.create(
            user_email='testuser@merriweather.com',
            user_name='Test User',
            team='Blue Team',
            total_activities=10,
            total_duration=300,
            total_distance=50.0,
            total_calories=3000,
            rank=1
        )

    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_leaderboard_entry(self):
        data = {
            'user_email': 'jane@merriweather.com',
            'user_name': 'Jane Doe',
            'team': 'Red Team',
            'total_activities': 8,
            'total_duration': 240,
            'total_distance': 40.0,
            'total_calories': 2400,
            'rank': 2
        }
        response = self.client.post('/api/leaderboard/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class WorkoutAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.workout = Workout.objects.create(
            name='Morning Run',
            description='A light morning run to start the day',
            difficulty='Easy',
            duration=30,
            category='Cardio',
            exercises=['Warm up', 'Run 5k', 'Cool down']
        )

    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {
            'name': 'HIIT Session',
            'description': 'High intensity interval training',
            'difficulty': 'Hard',
            'duration': 45,
            'category': 'Strength',
            'exercises': ['Burpees', 'Jump squats', 'Push-ups']
        }
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class APIRootTestCase(APITestCase):
    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
