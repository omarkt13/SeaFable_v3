// Database type definitions for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string // Changed to string (UUID)
          first_name: string
          last_name: string
          email: string
          password_hash: string
          avatar_url: string | null
          role: "user" | "host" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string // Changed to string (UUID)
          first_name: string
          last_name: string
          email: string
          password_hash: string
          avatar_url?: string | null
          role?: "user" | "host" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string // Changed to string (UUID)
          first_name?: string
          last_name?: string
          email?: string
          password_hash?: string
          avatar_url?: string | null
          role?: "user" | "host" | "admin"
          created_at?: string
          updated_at?: string
        }
      }
      host_profiles: {
        Row: {
          id: string
          user_id: string // Changed to string (UUID)
          name: string
          bio: string | null
          avatar_url: string | null
          years_experience: number | null
          certifications: string[] | null
          specialties: string[] | null
          rating: number
          total_reviews: number
          host_type: "captain" | "instructor" | "guide" | "company" | "individual_operator"
          languages_spoken: string[] | null
          business_name: string | null
          business_registration_id: string | null
          insurance_details: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string // Changed to string (UUID)
          name: string
          bio?: string | null
          avatar_url?: string | null
          years_experience?: number | null
          certifications?: string[] | null
          specialties?: string[] | null
          rating?: number
          total_reviews?: number
          host_type: "captain" | "instructor" | "guide" | "company" | "individual_operator"
          languages_spoken?: string[] | null
          business_name?: string | null
          business_registration_id?: string | null
          insurance_details?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string // Changed to string (UUID)
          name?: string
          bio?: string | null
          avatar_url?: string | null
          years_experience?: number | null
          certifications?: string[] | null
          specialties?: string[] | null
          rating?: number
          total_reviews?: number
          host_type?: "captain" | "instructor" | "guide" | "company" | "individual_operator"
          languages_spoken?: string[] | null
          business_name?: string | null
          business_registration_id?: string | null
          insurance_details?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          host_id: string
          title: string
          description: string | null
          short_description: string | null
          location: string | null
          specific_location: string | null
          country: string | null
          activity_type: string
          category: string[]
          duration_hours: number | null
          duration_display: string | null
          max_guests: number | null
          min_guests: number | null
          price_per_person: number | null
          difficulty_level: "beginner" | "intermediate" | "advanced" | "all_levels" | null
          rating: number
          total_reviews: number
          total_bookings: number
          primary_image_url: string | null
          weather_contingency: string | null
          included_amenities: string[] | null
          what_to_bring: string[] | null
          min_age: number | null
          max_age: number | null
          age_restriction_details: string | null
          activity_specific_details: any | null
          tags: string[] | null
          seasonal_availability: string[] | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          title: string
          description?: string | null
          short_description?: string | null
          location?: string | null
          specific_location?: string | null
          country?: string | null
          activity_type: string
          category: string[]
          duration_hours?: number | null
          duration_display?: string | null
          max_guests?: number | null
          min_guests?: number | null
          price_per_person?: number | null
          difficulty_level?: "beginner" | "intermediate" | "advanced" | "all_levels" | null
          rating?: number
          total_reviews?: number
          total_bookings?: number
          primary_image_url?: string | null
          weather_contingency?: string | null
          included_amenities?: string[] | null
          what_to_bring?: string[] | null
          min_age?: number | null
          max_age?: number | null
          age_restriction_details?: string | null
          activity_specific_details?: any | null
          tags?: string[] | null
          seasonal_availability?: string[] | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          title?: string
          description?: string | null
          short_description?: string | null
          location?: string | null
          specific_location?: string | null
          country?: string | null
          activity_type?: string
          category?: string[]
          duration_hours?: number | null
          duration_display?: string | null
          max_guests?: number | null
          min_guests?: number | null
          price_per_person?: number | null
          difficulty_level?: "beginner" | "intermediate" | "advanced" | "all_levels" | null
          rating?: number
          total_reviews?: number
          total_bookings?: number
          primary_image_url?: string | null
          weather_contingency?: string | null
          included_amenities?: string[] | null
          what_to_bring?: string[] | null
          min_age?: number | null
          max_age?: number | null
          age_restriction_details?: string | null
          activity_specific_details?: any | null
          tags?: string[] | null
          seasonal_availability?: string[] | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
