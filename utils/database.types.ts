
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
      chapter: {
        Row: {
          content: string[] | null
          created_at: string
          filelist: Json | null
          id: string
          manga_id: string | null
          name: string | null
          view: number | null
          reader?: string[] | null
        }
        Insert: {
          content?: string[] | null
          created_at?: string
          filelist?: Json | null
          id: string
          manga_id?: string | null
          name?: string | null
          view?: number | null
          reader?: string[] | null
        }
        Update: {
          content?: string[] | null
          created_at?: string
          filelist?: Json | null
          id?: string
          manga_id?: string | null
          name?: string | null
          view?: number | null
          reader?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_manga_id_fkey"
            columns: ["manga_id"]
            isOneToOne: false
            referencedRelation: "manga"
            referencedColumns: ["id"]
          },
        ]
      }
      cmtchapter: {
        Row: {
          chapter_Id: string
          created_at: string
          detail: string | null
          user_id: string
        }
        Insert: {
          chapter_Id: string
          created_at?: string
          detail?: string | null
          user_id: string
        }
        Update: {
          chapter_Id?: string
          created_at?: string
          detail?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cmtchapter_chapter_Id_fkey"
            columns: ["chapter_Id"]
            isOneToOne: false
            referencedRelation: "chapter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cmtchapter_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cmtmanga: {
        Row: {
          created_at: string
          detail: string | null
          manga_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          detail?: string | null
          manga_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          detail?: string | null
          manga_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cmtmanga_manga_id_fkey"
            columns: ["manga_id"]
            isOneToOne: false
            referencedRelation: "manga"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cmtmanga_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite: {
        Row: {
          manga_id: string
          user_id: string
        }
        Insert: {
          manga_id: string
          user_id: string
        }
        Update: {
          manga_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_manga_id_fkey"
            columns: ["manga_id"]
            isOneToOne: false
            referencedRelation: "manga"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          created_at: string
          manga_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          manga_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          manga_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "history_manga_id_fkey"
            columns: ["manga_id"]
            isOneToOne: false
            referencedRelation: "manga"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      manga: {
        Row: {
          author: string | null
          biatruyen: string | null
          created_at: string
          detail: string | null
          genre: string[] | null
          id: string
          name: string | null
          nguoi_dang: string | null
          other_name: string | null
          view: number | null
        }
        Insert: {
          author?: string | null
          biatruyen?: string | null
          created_at?: string
          detail?: string | null
          genre?: string[] | null
          id: string
          name?: string | null
          nguoi_dang?: string | null
          other_name?: string | null
          view?: number | null
        }
        Update: {
          author?: string | null
          biatruyen?: string | null
          created_at?: string
          detail?: string | null
          genre?: string[] | null
          id?: string
          name?: string | null
          nguoi_dang?: string | null
          other_name?: string | null
          view?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "manga_nguoi_dang_fkey"
            columns: ["nguoi_dang"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rate: {
        Row: {
          manga_id: string
          star: number | null
          user_id: string
        }
        Insert: {
          manga_id: string
          star?: number | null
          user_id: string
        }
        Update: {
          manga_id?: string
          star?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_manga_id_fkey"
            columns: ["manga_id"]
            isOneToOne: false
            referencedRelation: "manga"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rate_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
