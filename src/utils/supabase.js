import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch user profile from 'profiles' table
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

// Auth helper functions
export const auth = {
  signUp: async ({ email, password, username, full_name }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name,
        },
      },
    });
    return { data, error };
  },

  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
};

// AI Tools helper functions
export const aiTools = {
  // Get all tools with optional filters
  getAllTools: async ({ category, pricing, features, sort = 'created_at' } = {}) => {
    let query = supabase
      .from('ai_tools')
      .select(`
        *,
        tool_specifications (*),
        tool_features (feature),
        tool_integrations (integration),
        reviews (count)
      `);

    if (category) {
      query = query.eq('category', category);
    }
    if (pricing) {
      query = query.eq('pricing_type', pricing);
    }
    if (features) {
      query = query.contains('tool_features.feature', features);
    }

    const { data, error } = await query.order(sort, { ascending: false });
    return { data, error };
  },

  // Get a single tool by ID
  getToolById: async (id) => {
    const { data, error } = await supabase
      .from('ai_tools')
      .select(`
        *,
        tool_specifications (*),
        tool_features (feature),
        tool_integrations (integration),
        reviews (
          *,
          users (username, avatar_url)
        )
      `)
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Submit a new tool
  submitTool: async (toolData) => {
    const { data, error } = await supabase
      .from('tool_submissions')
      .upsert([toolData])
      .select()
      .single();
    return { data, error };
  },

  // Update tool information
  updateTool: async (id, updates) => {
    const { data, error } = await supabase
      .from('ai_tools')
      .upsert([{ id, ...updates }])
      .select()
      .single();
    return { data, error };
  },
};

// Reviews and Q&A helper functions
export const community = {
  // Add a review
  addReview: async (reviewData) => {
    const { data, error } = await supabase
      .from('reviews')
      .upsert([reviewData])
      .select()
      .single();
    return { data, error };
  },

  // Get reviews for a tool
  getToolReviews: async (toolId) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users (username, avatar_url)
      `)
      .eq('tool_id', toolId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Add a question
  addQuestion: async (questionData) => {
    const { data, error } = await supabase
      .from('questions_and_answers')
      .upsert([questionData])
      .select()
      .single();
    return { data, error };
  },

  // Get questions for a tool
  getToolQuestions: async (toolId) => {
    const { data, error } = await supabase
      .from('questions_and_answers')
      .select(`
        *,
        users (username, avatar_url),
        answers (
          *,
          users (username, avatar_url)
        )
      `)
      .eq('tool_id', toolId)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};

// User preferences and bookmarks
export const userPreferences = {
  // Toggle bookmark
  toggleBookmark: async (userId, toolId) => {
    const { data: existing } = await supabase
      .from('bookmarks')
      .select()
      .eq('user_id', userId)
      .eq('tool_id', toolId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('tool_id', toolId);
      return { data: null, error };
    } else {
      const { data, error } = await supabase
        .from('bookmarks')
        .upsert([{ user_id: userId, tool_id: toolId }])
        .select()
        .single();
      return { data, error };
    }
  },

  // Get user's bookmarks
  getUserBookmarks: async (userId) => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`
        *,
        ai_tools (*)
      `)
      .eq('user_id', userId);
    return { data, error };
  },

  // Save search preferences
  saveSearch: async (userId, searchData) => {
    const { data, error } = await supabase
      .from('saved_searches')
      .upsert([{ user_id: userId, ...searchData }])
      .select()
      .single();
    return { data, error };
  },

  // Get saved searches
  getSavedSearches: async (userId) => {
    const { data, error } = await supabase
      .from('saved_searches')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};

// Admin and moderation functions
export const admin = {
  // Get pending submissions
  getPendingSubmissions: async () => {
    const { data, error } = await supabase
      .from('tool_submissions')
      .select(`
        *,
        users (username, email)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Update submission status
  updateSubmissionStatus: async (submissionId, status, moderatorId, notes) => {
    const { data, error } = await supabase
      .from('tool_submissions')
      .upsert([{
        id: submissionId,
        status,
        moderator_notes: notes,
        reviewed_by: moderatorId,
        reviewed_at: new Date().toISOString(),
      }])
      .select()
      .single();
    return { data, error };
  },

  // Get audit logs
  getAuditLogs: async () => {
    const { data, error } = await supabase
      .from('audit_logs')
      .select(`
        *,
        users (username, email)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};

// Analytics functions
export const analytics = {
  // Record tool view
  recordToolView: async (toolId) => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase.rpc('increment_tool_views', {
      p_tool_id: toolId,
      p_date: today,
    });
    return { data, error };
  },

  // Get tool analytics
  getToolAnalytics: async (toolId, startDate, endDate) => {
    const { data, error } = await supabase
      .from('tool_analytics')
      .select()
      .eq('tool_id', toolId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });
    return { data, error };
  },
}; 