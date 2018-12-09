class CreateTranslations < ActiveRecord::Migration[5.2]
  def change
    create_table :translations do |t|
      t.string :key
      t.string :language
      t.string :value
      t.timestamps
    end
    add_index :translations, [:key, :language], :unique => true 
  end
end
