export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      circle_members: {
        Row: {
          accepted: boolean | null
          circle_id: string | null
          created_at: string | null
          id: string
          invited_email: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          accepted?: boolean | null
          circle_id?: string | null
          created_at?: string | null
          id?: string
          invited_email?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          accepted?: boolean | null
          circle_id?: string | null
          created_at?: string | null
          id?: string
          invited_email?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "circle_members_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "gift_circles"
            referencedColumns: ["id"]
          },
        ]
      }
      claimed_items: {
        Row: {
          circle_id: string | null
          claimed_at: string | null
          claimed_by: string | null
          id: string
          product_image: string | null
          product_name: string | null
          product_price: number | null
          product_url: string | null
        }
        Insert: {
          circle_id?: string | null
          claimed_at?: string | null
          claimed_by?: string | null
          id?: string
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          product_url?: string | null
        }
        Update: {
          circle_id?: string | null
          claimed_at?: string | null
          claimed_by?: string | null
          id?: string
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          product_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claimed_items_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "gift_circles"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_circles: {
        Row: {
          created_at: string | null
          created_by: string | null
          giftee_id: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          giftee_id?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          giftee_id?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_circles_giftee_id_fkey"
            columns: ["giftee_id"]
            isOneToOne: false
            referencedRelation: "giftees"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_history: {
        Row: {
          created_at: string | null
          feedback: string | null
          feedback_notes: string | null
          giftee_id: string | null
          id: string
          occasion_id: string | null
          product_image: string | null
          product_name: string | null
          product_price: number | null
          product_url: string | null
          purchased_at: string | null
          retailer: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback?: string | null
          feedback_notes?: string | null
          giftee_id?: string | null
          id?: string
          occasion_id?: string | null
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          product_url?: string | null
          purchased_at?: string | null
          retailer?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback?: string | null
          feedback_notes?: string | null
          giftee_id?: string | null
          id?: string
          occasion_id?: string | null
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          product_url?: string | null
          purchased_at?: string | null
          retailer?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_history_giftee_id_fkey"
            columns: ["giftee_id"]
            isOneToOne: false
            referencedRelation: "giftees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gift_history_occasion_id_fkey"
            columns: ["occasion_id"]
            isOneToOne: false
            referencedRelation: "occasions"
            referencedColumns: ["id"]
          },
        ]
      }
      giftees: {
        Row: {
          age: number | null
          budget_max: number | null
          budget_min: number | null
          colors: string[] | null
          created_at: string | null
          dislikes: string[] | null
          gender: string | null
          id: string
          interests: string[] | null
          name: string
          notes: string | null
          profile_completed_by: string | null
          relationship: string | null
          shareable_slug: string | null
          sizes: Json | null
          styles: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          age?: number | null
          budget_max?: number | null
          budget_min?: number | null
          colors?: string[] | null
          created_at?: string | null
          dislikes?: string[] | null
          gender?: string | null
          id?: string
          interests?: string[] | null
          name: string
          notes?: string | null
          profile_completed_by?: string | null
          relationship?: string | null
          shareable_slug?: string | null
          sizes?: Json | null
          styles?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          age?: number | null
          budget_max?: number | null
          budget_min?: number | null
          colors?: string[] | null
          created_at?: string | null
          dislikes?: string[] | null
          gender?: string | null
          id?: string
          interests?: string[] | null
          name?: string
          notes?: string | null
          profile_completed_by?: string | null
          relationship?: string | null
          shareable_slug?: string | null
          sizes?: Json | null
          styles?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mentions: {
        Row: {
          content: string
          created_at: string | null
          giftee_id: string | null
          id: string
          mentioned_at: string | null
          used: boolean | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          giftee_id?: string | null
          id?: string
          mentioned_at?: string | null
          used?: boolean | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          giftee_id?: string | null
          id?: string
          mentioned_at?: string | null
          used?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentions_giftee_id_fkey"
            columns: ["giftee_id"]
            isOneToOne: false
            referencedRelation: "giftees"
            referencedColumns: ["id"]
          },
        ]
      }
      occasions: {
        Row: {
          created_at: string | null
          date: string
          giftee_id: string | null
          id: string
          name: string | null
          recurring: boolean | null
          reminder_days: number[] | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          giftee_id?: string | null
          id?: string
          name?: string | null
          recurring?: boolean | null
          reminder_days?: number[] | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          giftee_id?: string | null
          id?: string
          name?: string | null
          recurring?: boolean | null
          reminder_days?: number[] | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "occasions_giftee_id_fkey"
            columns: ["giftee_id"]
            isOneToOne: false
            referencedRelation: "giftees"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          id: string
          price: number | null
          recorded_at: string | null
          saved_product_id: string | null
        }
        Insert: {
          id?: string
          price?: number | null
          recorded_at?: string | null
          saved_product_id?: string | null
        }
        Update: {
          id?: string
          price?: number | null
          recorded_at?: string | null
          saved_product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_history_saved_product_id_fkey"
            columns: ["saved_product_id"]
            isOneToOne: false
            referencedRelation: "saved_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_clicks: {
        Row: {
          clicked_at: string | null
          giftee_id: string | null
          id: string
          product_id: string | null
          product_name: string | null
          product_url: string | null
          purchased: boolean | null
          user_id: string | null
        }
        Insert: {
          clicked_at?: string | null
          giftee_id?: string | null
          id?: string
          product_id?: string | null
          product_name?: string | null
          product_url?: string | null
          purchased?: boolean | null
          user_id?: string | null
        }
        Update: {
          clicked_at?: string | null
          giftee_id?: string | null
          id?: string
          product_id?: string | null
          product_name?: string | null
          product_url?: string | null
          purchased?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_clicks_giftee_id_fkey"
            columns: ["giftee_id"]
            isOneToOne: false
            referencedRelation: "giftees"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          colors: string[] | null
          created_at: string | null
          dislikes: string[] | null
          id: string
          interests: string[] | null
          name: string | null
          referral_code: string | null
          referral_count: number | null
          referred_by: string | null
          shareable_slug: string | null
          sizes: Json | null
          styles: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          colors?: string[] | null
          created_at?: string | null
          dislikes?: string[] | null
          id?: string
          interests?: string[] | null
          name?: string | null
          referral_code?: string | null
          referral_count?: number | null
          referred_by?: string | null
          shareable_slug?: string | null
          sizes?: Json | null
          styles?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          colors?: string[] | null
          created_at?: string | null
          dislikes?: string[] | null
          id?: string
          interests?: string[] | null
          name?: string | null
          referral_code?: string | null
          referral_count?: number | null
          referred_by?: string | null
          shareable_slug?: string | null
          sizes?: Json | null
          styles?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendation_cache: {
        Row: {
          cache_key: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          recommendations: Json | null
        }
        Insert: {
          cache_key?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          recommendations?: Json | null
        }
        Update: {
          cache_key?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          recommendations?: Json | null
        }
        Relationships: []
      }
      saved_products: {
        Row: {
          created_at: string | null
          current_price: number | null
          giftee_id: string | null
          id: string
          last_checked_at: string | null
          original_price: number | null
          price_alert_enabled: boolean | null
          product_id: string | null
          product_image: string | null
          product_name: string | null
          product_url: string | null
          retailer: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_price?: number | null
          giftee_id?: string | null
          id?: string
          last_checked_at?: string | null
          original_price?: number | null
          price_alert_enabled?: boolean | null
          product_id?: string | null
          product_image?: string | null
          product_name?: string | null
          product_url?: string | null
          retailer?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_price?: number | null
          giftee_id?: string | null
          id?: string
          last_checked_at?: string | null
          original_price?: number | null
          price_alert_enabled?: boolean | null
          product_id?: string | null
          product_image?: string | null
          product_name?: string | null
          product_url?: string | null
          retailer?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_products_giftee_id_fkey"
            columns: ["giftee_id"]
            isOneToOne: false
            referencedRelation: "giftees"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never
