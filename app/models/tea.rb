class Tea < ApplicationRecord
    # Tea class inherits from ApplicationRecord, which inherits from ActiveRecord::Base, which allows use of macro methods, like has_many & has_many :through (sets up a connection with review & user models so we can use tea = Tea.first; tea.users; tea.reviews).
    has_many :reviews
    has_many :users, through: :reviews
    belongs_to :category
end
