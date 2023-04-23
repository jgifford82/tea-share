class CreateTeas < ActiveRecord::Migration[6.1]
  def change
    create_table :teas do |t|
      t.string :name
      t.text :blend
      t.string :caffeine_level
      t.string :integer
      t.integer :user_id
      t.integer :category_id

      t.timestamps
    end
  end
end
