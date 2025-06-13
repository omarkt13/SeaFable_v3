// This file contains type definitions for your Supabase database tables

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          user_id: string
          experience_id: string
          booking_date: string
          participants: number
          total_price: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          experience_id: string
          booking_date: string
          participants: number
          total_price: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          experience_id?: string
          booking_date?: string
          participants?: number
          total_price?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      captains: {
        Row: {
          id: string
          host_id: string
          name: string
          bio: string
          years_experience: number
          certifications: string[] | null
          profile_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          name: string
          bio: string
          years_experience: number
          certifications?: string[] | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          name?: string
          bio?: string
          years_experience?: number
          certifications?: string[] | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "captains_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "host_profiles"
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
            isOneToOne: false
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
          description: string
          duration_hours: number | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          experience_id: string
          day_number: number
          title: string
          description: string
          duration_hours?: number | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          experience_id?: string
          day_number?: number
          title?: string
          description?: string
          duration_hours?: number | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_itinerary_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
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
          description: string
          location: string
          activity_type: string
          price: number
          duration: number
          max_participants: number
          image_urls: string[] | null
          rating: number | null
          review_count: number | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          title: string
          description: string
          location: string
          activity_type: string
          price: number
          duration: number
          max_participants: number
          image_urls?: string[] | null
          rating?: number | null
          review_count?: number | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          title?: string
          description?: string
          location?: string
          activity_type?: string
          price?: number
          duration?: number
          max_participants?: number
          image_urls?: string[] | null
          rating?: number | null
          review_count?: number | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_analytics: {
        Row: {
          id: string
          host_id: string
          views: number
          bookings: number
          revenue: number
          average_rating: number | null
          period_start: string
          period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          views: number
          bookings: number
          revenue: number
          average_rating?: number | null
          period_start: string
          period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          views?: number
          bookings?: number
          revenue?: number
          average_rating?: number | null
          period_start?: string
          period_end?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_analytics_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_availability: {
        Row: {
          id: string
          host_id: string
          experience_id: string
          date: string
          available_slots: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          experience_id: string
          date: string
          available_slots: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          experience_id?: string
          date?: string
          available_slots?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_availability_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_availability_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
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
          tax_id: string | null
          payment_details: Json | null
          notification_preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          business_name?: string | null
          business_address?: string | null
          tax_id?: string | null
          payment_details?: Json | null
          notification_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          business_name?: string | null
          business_address?: string | null
          tax_id?: string | null
          payment_details?: Json | null
          notification_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_business_settings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: true
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
          status: string
          payout_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          booking_id: string
          amount: number
          status: string
          payout_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          booking_id?: string
          amount?: number
          status?: string
          payout_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_earnings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_earnings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string
          description: string | null
          website: string | null
          phone: string | null
          profile_image: string | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          description?: string | null
          website?: string | null
          phone?: string | null
          profile_image?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          description?: string | null
          website?: string | null
          phone?: string | null
          profile_image?: string | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      host_team_members: {
        Row: {
          id: string
          host_id: string
          name: string
          email: string
          role: string
          permissions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          name: string
          email: string
          role: string
          permissions: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          name?: string
          email?: string
          role?: string
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_team_members_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "host_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          experience_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          user_id: string
          experience_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          user_id?: string
          experience_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[Extract<
      keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"]),
      string
    >]
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions]
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database; table: keyof PublicSchema["Tables"] },
> = PublicTableNameOrOptions extends { schema: keyof Database; table: keyof PublicSchema["Tables"] }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][PublicTableNameOrOptions["table"]] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database; table: keyof PublicSchema["Tables"] },
> = PublicTableNameOrOptions extends { schema: keyof Database; table: keyof PublicSchema["Tables"] }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][PublicTableNameOrOptions["table"]] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database; enum: keyof PublicSchema["Enums"] },
> = PublicEnumNameOrOptions extends { schema: keyof Database; enum: keyof PublicSchema["Enums"] }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][PublicEnumNameOrOptions["enum"]]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
