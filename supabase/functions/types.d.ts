export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      article_tags: {
        Row: {
          article_id: string;
          created_at: string;
          tag_id: string;
        };
        Insert: {
          article_id: string;
          created_at?: string;
          tag_id: string;
        };
        Update: {
          article_id?: string;
          created_at?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_articles_id_fk";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "article_tags_tag_id_tags_id_fk";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      articles: {
        Row: {
          category_id: string | null;
          content: string;
          created_at: string;
          id: string;
          published_at: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          category_id?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          published_at?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          category_id?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          published_at?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "articles_category_id_categories_id_fk";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          first_name: string;
          id: string;
          last_name: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          first_name: string;
          id?: string;
          last_name: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      sources: {
        Row: {
          created_at: string;
          updated_at: string | null;
          id: string;
          label: string;
          link: string;
        };
        Insert: {
          created_at?: string;
          updated_at?: string | null;
          id?: string;
          label: string;
          link: string;
        };
        Update: {
          created_at?: string;
          updated_at?: string | null;
          id?: string;
          label?: string;
          link?: string;
        };
        Relationships: [];
      };
    
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          updated_at: string | null;
          user_id: string;
          user_role: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          updated_at?: string | null;
          user_id: string;
          user_role: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          updated_at?: string | null;
          user_id?: string;
          user_role?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

// Schema: public
// Tables
export type ArticleTag = Database["public"]["Tables"]["article_tags"]["Row"];
export type InsertArticleTag =
  Database["public"]["Tables"]["article_tags"]["Insert"];
export type UpdateArticleTag =
  Database["public"]["Tables"]["article_tags"]["Update"];

export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type InsertArticle = Database["public"]["Tables"]["articles"]["Insert"];
export type UpdateArticle = Database["public"]["Tables"]["articles"]["Update"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type InsertCategory =
  Database["public"]["Tables"]["categories"]["Insert"];
export type UpdateCategory =
  Database["public"]["Tables"]["categories"]["Update"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type InsertProfile = Database["public"]["Tables"]["profiles"]["Insert"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];

export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type InsertTag = Database["public"]["Tables"]["tags"]["Insert"];
export type UpdateTag = Database["public"]["Tables"]["tags"]["Update"];

export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];
export type InsertUserRole =
  Database["public"]["Tables"]["user_roles"]["Insert"];
export type UpdateUserRole =
  Database["public"]["Tables"]["user_roles"]["Update"];

export type Source = Database["public"]["Tables"]["sources"]["Row"];
export type InsertSource = Database["public"]["Tables"]["sources"]["Insert"];
export type UpdateSource = Database["public"]["Tables"]["sources"]["Update"];
