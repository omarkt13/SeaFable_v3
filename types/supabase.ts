export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          user_id: string
          experience_id: string
          booking_date: string
          start_time: string | null
          end_time: string | null
          status: "pending" | "confirmed" | "cancelled" | "completed"
          total_price: number
          guests_count: number
          special_requests: string | null
          contact_phone: string | null
          created_at: string
          updated_at: string
          payment_status: "pending" | "paid" | "refunded" | "failed"
          payment_id: string | null
          refund_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          experience_id: string
          booking_date: string
          start_time?: string | null
          end_time?: string | null
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          total_price: number
          guests_count: number
          special_requests?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
          payment_status?: "pending" | "paid" | "refunded" | "failed"
          payment_id?: string | null
          refund_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          experience_id?: string
          booking_date?: string
          start_time?: string | null
          end_time?: string | null
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          total_price?: number
          guests_count?: number
          special_requests?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
          payment_status?: "pending" | "paid" | "refunded" | "failed"
          payment_id?: string | null
          refund_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_experience_id_fkey"
            columns: ["experience_id"]
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      captains: {
        Row: {
          id: string
          user_id: string
          full_name: string
          bio: string | null
          years_experience: number | null
          certifications: string[] | null
          profile_image_url: string | null
          license_number: string | null
          license_type: string | null
          license_expiry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          bio?: string | null
          years_experience?: number | null
          certifications?: string[] | null
          profile_image_url?: string | null
          license_number?: string | null
          license_type?: string | null
          license_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          bio?: string | null
          years_experience?: number | null
          certifications?: string[] | null
          profile_image_url?: string | null
          license_number?: string | null
          license_type?: string | null
          license_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "captains_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_images: {
        Row: {
          id: string
          experience_id: string
          image_url: string
          caption: string | null
          is_primary: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          experience_id: string
          image_url: string
          caption?: string | null
          is_primary?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          experience_id?: string
          image_url?: string
          caption?: string | null
          is_primary?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_images_experience_id_fkey"
            columns: ["experience_id"]
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_itinerary: {
        Row: {
          id: string
          experience_id: string
          day_number: number
          title: string
          description: string | null
          duration_minutes: number | null
          location: string | null
          start_time: string | null
          end_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          experience_id: string
          day_number: number
          title: string
          description?: string | null
          duration_minutes?: number | null
          location?: string | null
          start_time?: string | null
          end_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          experience_id?: string
          day_number?: number
          title?: string
          description?: string | null
          duration_minutes?: number | null
          location?: string | null
          start_time?: string | null
          end_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_itinerary_experience_id_fkey"
            columns: ["experience_id"]
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
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
          activity_specific_details: Json | null
          tags: string[] | null
          seasonal_availability: string[] | null
          is_active: boolean
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
          activity_specific_details?: Json | null
          tags?: string[] | null
          seasonal_availability?: string[] | null
          is_active?: boolean
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
          activity_specific_details?: Json | null
          tags?: string[] | null
          seasonal_availability?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_host_id_fkey"
            columns: ["host_id"]
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_analytics: {
        Row: {
          id: string
          host_id: string
          date: string
          views: number
          bookings: number
          revenue: number
          cancellations: number
          average_rating: number | null
          new_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          date: string
          views?: number
          bookings?: number
          revenue?: number
          cancellations?: number
          average_rating?: number | null
          new_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          date?: string
          views?: number
          bookings?: number
          revenue?: number
          cancellations?: number
          average_rating?: number | null
          new_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_analytics_host_id_fkey"
            columns: ["host_id"]
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_availability: {
        Row: {
          id: string
          host_id: string
          experience_id: string | null
          date: string
          start_time: string | null
          end_time: string | null
          is_available: boolean
          max_bookings: number | null
          current_bookings: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          experience_id?: string | null
          date: string
          start_time?: string | null
          end_time?: string | null
          is_available?: boolean
          max_bookings?: number | null
          current_bookings?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          experience_id?: string | null
          date?: string
          start_time?: string | null
          end_time?: string | null
          is_available?: boolean
          max_bookings?: number | null
          current_bookings?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_availability_experience_id_fkey"
            columns: ["experience_id"]
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_availability_host_id_fkey"
            columns: ["host_id"]
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_business_settings: {
        Row: {
          id: string
          host_id: string
          business_name: string | null
          business_address: string | null
          business_phone: string | null
          business_email: string | null
          tax_id: string | null
          payment_methods: string[] | null
          cancellation_policy: string | null
          refund_policy: string | null
          insurance_provider: string | null
          insurance_policy_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          business_name?: string | null
          business_address?: string | null
          business_phone?: string | null
          business_email?: string | null
          tax_id?: string | null
          payment_methods?: string[] | null
          cancellation_policy?: string | null
          refund_policy?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          business_name?: string | null
          business_address?: string | null
          business_phone?: string | null
          business_email?: string | null
          tax_id?: string | null
          payment_methods?: string[] | null
          cancellation_policy?: string | null
          refund_policy?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_business_settings_host_id_fkey"
            columns: ["host_id"]
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_earnings: {
        Row: {
          id: string
          host_id: string
          booking_id: string
          amount: number
          fee_amount: number
          net_amount: number
          currency: string
          status: "pending" | "paid" | "failed"
          payout_date: string | null
          payout_method: string | null
          payout_reference: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          booking_id: string
          amount: number
          fee_amount: number
          net_amount: number
          currency: string
          status?: "pending" | "paid" | "failed"
          payout_date?: string | null
          payout_method?: string | null
          payout_reference?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          booking_id?: string
          amount?: number
          fee_amount?: number
          net_amount?: number
          currency?: string
          status?: "pending" | "paid" | "failed"
          payout_date?: string | null
          payout_method?: string | null
          payout_reference?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_earnings_booking_id_fkey"
            columns: ["booking_id"]
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_earnings_host_id_fkey"
            columns: ["host_id"]
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_profiles: {
        Row: {
          id: string
          user_id: string
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
          user_id: string
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
          user_id?: string
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
        Relationships: [
          {
            foreignKeyName: "host_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      host_team_members: {
        Row: {
          id: string
          host_id: string
          user_id: string | null
          full_name: string
          email: string | null
          role: string
          permissions: string[]
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          user_id?: string | null
          full_name: string
          email?: string | null
          role: string
          permissions: string[]
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          user_id?: string | null
          full_name?: string
          email?: string | null
          role?: string
          permissions?: string[]
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_team_members_host_id_fkey"
            columns: ["host_id"]
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_team_members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          experience_id: string
          booking_id: string | null
          rating: number
          content: string | null
          host_response: string | null
          host_response_date: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          experience_id: string
          booking_id?: string | null
          rating: number
          content?: string | null
          host_response?: string | null
          host_response_date?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          experience_id?: string
          booking_id?: string | null
          rating?: number
          content?: string | null
          host_response?: string | null
          host_response_date?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_experience_id_fkey"
            columns: ["experience_id"]
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      schema_migrations: {
        Row: {
          version: string
          applied_at: string
        }
        Insert: {
          version: string
          applied_at?: string
        }
        Update: {
          version?: string
          applied_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "user" | "host" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "host" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "host" | "admin"
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
