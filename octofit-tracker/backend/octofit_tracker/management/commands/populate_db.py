from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete existing data using Django ORM
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write('Creating teams...')
        
        # Create Teams
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes'
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='The World\'s Greatest Super Heroes'
        )
        
        self.stdout.write('Creating users...')
        
        # Create Marvel Users
        marvel_heroes = [
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com'},
            {'name': 'Steve Rogers', 'email': 'captainamerica@marvel.com'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com'},
            {'name': 'Bruce Banner', 'email': 'hulk@marvel.com'},
            {'name': 'Thor Odinson', 'email': 'thor@marvel.com'},
            {'name': 'Peter Parker', 'email': 'spiderman@marvel.com'},
        ]
        
        # Create DC Users
        dc_heroes = [
            {'name': 'Clark Kent', 'email': 'superman@dc.com'},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com'},
            {'name': 'Barry Allen', 'email': 'flash@dc.com'},
            {'name': 'Arthur Curry', 'email': 'aquaman@dc.com'},
            {'name': 'Hal Jordan', 'email': 'greenlantern@dc.com'},
        ]
        
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team Marvel'
            )
            marvel_users.append(user)
        
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team DC'
            )
            dc_users.append(user)
        
        all_users = marvel_users + dc_users
        
        self.stdout.write('Creating activities...')
        
        # Create Activities
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weight Training', 'Yoga', 'Boxing']
        
        for user in all_users:
            # Create 5-10 random activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 120)
                distance = round(random.uniform(2.0, 20.0), 2)
                calories = duration * random.randint(5, 10)
                date = datetime.now() - timedelta(days=random.randint(1, 30))
                
                Activity.objects.create(
                    user_email=user.email,
                    activity_type=activity_type,
                    duration=duration,
                    distance=distance,
                    calories=calories,
                    date=date,
                    notes=f'{activity_type} session by {user.name}'
                )
        
        self.stdout.write('Creating leaderboard entries...')
        
        # Create Leaderboard entries
        for rank, user in enumerate(all_users, start=1):
            user_activities = Activity.objects.filter(user_email=user.email)
            
            total_activities = user_activities.count()
            total_duration = sum(activity.duration for activity in user_activities)
            total_distance = sum(activity.distance for activity in user_activities)
            total_calories = sum(activity.calories for activity in user_activities)
            
            Leaderboard.objects.create(
                user_email=user.email,
                user_name=user.name,
                team=user.team,
                total_activities=total_activities,
                total_duration=total_duration,
                total_distance=round(total_distance, 2),
                total_calories=total_calories,
                rank=rank
            )
        
        self.stdout.write('Creating workouts...')
        
        # Create Workouts
        workouts = [
            {
                'name': 'Iron Man Power Circuit',
                'description': 'High-intensity circuit training to build strength and endurance like Tony Stark',
                'difficulty': 'Hard',
                'duration': 45,
                'category': 'Strength',
                'exercises': [
                    {'name': 'Push-ups', 'reps': 20, 'sets': 3},
                    {'name': 'Bench Press', 'reps': 12, 'sets': 4},
                    {'name': 'Shoulder Press', 'reps': 15, 'sets': 3},
                ]
            },
            {
                'name': 'Captain America Endurance Run',
                'description': 'Build superhuman endurance with this progressive running program',
                'difficulty': 'Medium',
                'duration': 60,
                'category': 'Cardio',
                'exercises': [
                    {'name': 'Warm-up Jog', 'duration': 10},
                    {'name': 'Interval Sprints', 'duration': 30},
                    {'name': 'Cool-down Walk', 'duration': 10},
                ]
            },
            {
                'name': 'Black Widow Agility Training',
                'description': 'Develop agility, flexibility, and martial arts conditioning',
                'difficulty': 'Hard',
                'duration': 50,
                'category': 'Martial Arts',
                'exercises': [
                    {'name': 'Jump Rope', 'duration': 10},
                    {'name': 'Kata Practice', 'duration': 20},
                    {'name': 'Flexibility Stretches', 'duration': 15},
                ]
            },
            {
                'name': 'Thor\'s Hammer Strength',
                'description': 'Build god-like strength with heavy compound movements',
                'difficulty': 'Hard',
                'duration': 70,
                'category': 'Strength',
                'exercises': [
                    {'name': 'Deadlifts', 'reps': 8, 'sets': 5},
                    {'name': 'Squats', 'reps': 10, 'sets': 5},
                    {'name': 'Overhead Press', 'reps': 12, 'sets': 4},
                ]
            },
            {
                'name': 'Spider-Man Bodyweight Blast',
                'description': 'Master bodyweight movements for incredible strength-to-weight ratio',
                'difficulty': 'Medium',
                'duration': 40,
                'category': 'Calisthenics',
                'exercises': [
                    {'name': 'Pull-ups', 'reps': 15, 'sets': 3},
                    {'name': 'Pistol Squats', 'reps': 10, 'sets': 3},
                    {'name': 'Handstand Push-ups', 'reps': 8, 'sets': 3},
                ]
            },
            {
                'name': 'Superman Flight Training',
                'description': 'Core and stability work for superhuman balance',
                'difficulty': 'Easy',
                'duration': 30,
                'category': 'Core',
                'exercises': [
                    {'name': 'Plank', 'duration': 3},
                    {'name': 'Superman Holds', 'reps': 12, 'sets': 3},
                    {'name': 'Bird Dogs', 'reps': 15, 'sets': 3},
                ]
            },
            {
                'name': 'Batman Combat Conditioning',
                'description': 'Train like the Dark Knight with this all-around combat workout',
                'difficulty': 'Hard',
                'duration': 60,
                'category': 'Mixed',
                'exercises': [
                    {'name': 'Heavy Bag Work', 'duration': 15},
                    {'name': 'Grappling Drills', 'duration': 20},
                    {'name': 'Parkour Basics', 'duration': 15},
                ]
            },
            {
                'name': 'Wonder Woman Warrior Workout',
                'description': 'Amazonian strength and combat training',
                'difficulty': 'Medium',
                'duration': 55,
                'category': 'Strength',
                'exercises': [
                    {'name': 'Warrior Lunges', 'reps': 15, 'sets': 3},
                    {'name': 'Shield Presses', 'reps': 12, 'sets': 4},
                    {'name': 'Sword Swings', 'reps': 20, 'sets': 3},
                ]
            },
            {
                'name': 'Flash Speed Training',
                'description': 'Maximize your speed and explosive power',
                'difficulty': 'Medium',
                'duration': 45,
                'category': 'Cardio',
                'exercises': [
                    {'name': 'Sprint Intervals', 'duration': 20},
                    {'name': 'Plyometric Jumps', 'reps': 15, 'sets': 4},
                    {'name': 'Agility Ladder', 'duration': 15},
                ]
            },
            {
                'name': 'Aquaman Swim Session',
                'description': 'Build aquatic endurance and full-body strength',
                'difficulty': 'Easy',
                'duration': 40,
                'category': 'Swimming',
                'exercises': [
                    {'name': 'Freestyle', 'duration': 15},
                    {'name': 'Butterfly', 'duration': 10},
                    {'name': 'Underwater Training', 'duration': 10},
                ]
            },
        ]
        
        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS('Successfully populated the database!'))
        self.stdout.write(f'Created {Team.objects.count()} teams')
        self.stdout.write(f'Created {User.objects.count()} users')
        self.stdout.write(f'Created {Activity.objects.count()} activities')
        self.stdout.write(f'Created {Leaderboard.objects.count()} leaderboard entries')
        self.stdout.write(f'Created {Workout.objects.count()} workouts')
