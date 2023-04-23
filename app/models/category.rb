class Category < ApplicationRecord
    # Category class inherits from ApplicationRecord, which inherits from ActiveRecord::Base, which allows use of macro methods, like has_many (sets up a connection with tea model so we can use category = Category.first; category.teas).
    has_many :teas
end
