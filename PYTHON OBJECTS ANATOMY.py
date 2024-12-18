class Car:
    total_cars = 0  # class attribute

    def __init__(self, name, year):
        self.name = name  # instance attribute
        self.year = year
        Car.total_cars += 1  # increment total_cars when a new Car is created

    def age(self): #instance method
        from datetime import datetime
        current_year = datetime.now().year
        return current_year - self.year

    @classmethod
    def get_total_cars(cls): #cls: conventional name for the class parameter.
        return cls.total_cars  # class method

    @staticmethod
    def hello(x):
        return "Hello " + x.name  # static method, utility functions that are related to the class but do not need to access or modify the class or instance attributes.


class ElectricCar(Car):  # Extending Car class
    def __init__(self, name, year, battery_life):
        super().__init__(name, year)  # call the parent class constructor
        self.battery_life = battery_life  # additional attribute for ElectricCar

    def battery_status(self):
        return f"Battery life is {self.battery_life}%"  # instance method specific to ElectricCar


my_car = Car("Ford", 2015)
my_electric_car = ElectricCar("Tesla", 2020, 85)

# You can call 'get_total_cars()' on the Car class:
print("Total cars:", Car.get_total_cars())

# But NOT on a Car object:
print(my_car.get_total_cars())  # this will raise an AttributeError

# Calling static method with an instance
print(Car.hello(my_car))  # Output: "Hello Ford"




#DJANGO MODELS:

class Person(models.Model): #inherits from models.Model class
    # Fields, these are class attributes, by Django model convention.
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birthdate = models.DateField()
    email = models.EmailField(unique=True, null=True, blank=True)

    # Meta class (optional)
    class Meta:
        verbose_name_plural = "People"
        ordering = ['last_name', 'first_name']

    # Methods (optional), these are instance methods
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
