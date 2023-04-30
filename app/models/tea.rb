class Tea < ApplicationRecord
    # Tea class inherits from ApplicationRecord, which inherits from ActiveRecord::Base, which allows use of macro methods, like has_many & has_many :through (sets up a connection with review & user models so we can use tea = Tea.first; tea.users; tea.reviews).
    has_many :reviews
    has_many :users, through: :reviews
    belongs_to :category

    # makes sure name, blend, caffeine_level & category_id exists 
    # name is unique regardless of capitalization
    # blend has at least 10 characters
    # caffeine_level must be an integer between 1-5
    validates :name, presence: true, uniqueness: { case_sensitive: false }
    validates :blend, presence: true, length: { minimum: 10 }
    validates :caffeine_level, presence: true, inclusion: { in: 1..5, message: "must be between 1 and 5" }
    validates :category_id, presence: true
end
