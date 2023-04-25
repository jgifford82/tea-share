require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "🌱 Seeding data..."

# Destroy all records from tables before executing the rest of the seed code so tables don't get too big while experimenting with project. 
# This doesn't overwrite ID numbers. Can use "rake db:reset" instead of destroy_all to drop database, run migrations, then run seed file. No need to run "rake db:migration" or "rake db:seed" in that case. 
Category.destroy_all
User.destroy_all
Tea.destroy_all
Review.destroy_all

# reset all id's to start from 1 after all records have been destroyed and the database is re-seeded
ActiveRecord::Base.connection.tables.each do |t|
    ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

# Create an array of the tea types you want to use as category names
tea_types = ['Black', 'Green', 'Herbal', 'Oolong', 'White']
# Loop through the tea types array and create a new Category for each one
tea_types.each do |type|
    Category.create!(name: type)
end

steep = "Steep 1 teaspoon in 8 oz boiling water for 3-5 minutes."
# Define an array of tea blends
tea_blends = [  "Black Tea, Elderberries, Aronia berries, Black Currants. #{steep}",  "Green tea, lavender, rose petals. #{steep}",  "White Tea, Peach Pieces, Apricot Pieces, Orange Peel. #{steep}",  "Lemon balm, lavender, and mint. #{steep}", "Black Tea, Orange Peel, Jasmine Flowers, Blue Cornflower, Bergamot Oil, Vanilla Extract. #{steep}", "Earl grey, rose petals. #{steep}", "Black Tea, Oolong Tea, Rooibos Tea, Apple Pieces, Cocoa Nibs, Cornflowers, Calendula. #{steep}", "Green Rooibos, Ginger, Currant, Blueberry, Beetroot, Cinnamon, Blackberry Leaf, Lemongrass. #{steep}", "Tea. Earl Grey. Hot.", "Decaf Black Tea, Cinnamon Chips, Orange Peel, Ginger, Clove, Orange Extract. #{steep}" ]

# create 5 users
users = []
5.times do
    users << User.create!(
        username: Faker::TvShows::ParksAndRec.unique.character,
        password: "test"
    )
end

# create 2 unique teas for each user
users.each do |user|
  2.times do
    tea = Tea.create!(
      name: Faker::Tea.unique.variety,
      blend: tea_blends.sample,
      caffeine_level: Faker::Number.between(from: 1, to: 5),
      user_id: user.id,
      category_id: Category.all.sample.id
    )

    # create 3 user reviews for each tea
    3.times do
      Review.create!(
        comment: Faker::TvShows::TheITCrowd.unique.quote,
        rating: rand(1..5),
        user_id: User.all.sample.id,
        tea_id: tea.id
      )
    end
  end
end

puts "✅ Done seeding!"

p "Created #{Tea.count} teas"
p "Created #{Category.count} categories"
p "Created #{User.count} users"
p "Created #{Review.count} reviews"