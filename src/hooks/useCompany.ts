import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Company } from '../types';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useCompany = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCompany = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setCompany(data);
    } catch (error) {
      console.error('Error fetching company:', error);
      toast.error('Failed to fetch company data');
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([{ ...companyData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setCompany(data);
      toast.success('Company created successfully!');
      return data;
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error('Failed to create company');
      throw error;
    }
  };

  const updateCompany = async (companyData: Partial<Company>) => {
    if (!company || !user) throw new Error('Company or user not found');

    try {
      const { data, error } = await supabase
        .from('companies')
        .update(companyData)
        .eq('id', company.id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setCompany(data);
      toast.success('Company updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company');
      throw error;
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [user]);

  return {
    company,
    loading,
    createCompany,
    updateCompany,
    refetch: fetchCompany,
  };
};