class User < ApplicationRecord
    # works with bcrypt gem to hash and salt all passwords on User model. provides instance methods password and password_confirmation
    has_secure_password

    # makes sure username exists, is unique, & has at least 2 characters
    validates :username, presence: true, uniqueness: true, length: { minimum: 2 }
    # makes sure password is between 2-8 characters
    validates :password, length: { in: 2..8 }

    # User class inherits from ApplicationRecord, which inherits from ActiveRecord::Base, which allows use of macro methods, like has_many & has_many :through (sets up a connection with review & tea models so we can use user = User.first; user.teas; user.reviews).
    has_many :reviews
    has_many :teas, through: :reviews

end
