import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCompany } from '../hooks/useCompany';

// Mock the auth context
const mockUser = { id: 'user-123', email: 'test@example.com', role: 'admin' as const };

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: mockUser })
}));

// Mock Supabase
const mockSupabase = {
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn()
      })
    }),
    insert: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn()
      })
    }),
    update: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn()
          })
        })
      })
    })
  })
};

vi.mock('../lib/supabase', () => ({
  supabase: mockSupabase
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('useCompany', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch company data on mount', async () => {
    const mockCompany = {
      id: 'company-123',
      name: 'Test Company',
      bio: 'Test bio',
      user_id: 'user-123'
    };

    mockSupabase.from().select().eq().single.mockResolvedValue({
      data: mockCompany,
      error: null
    });

    const { result } = renderHook(() => useCompany());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.company).toEqual(mockCompany);
  });

  it('should handle company creation', async () => {
    const newCompany = {
      name: 'New Company',
      bio: 'New bio',
      about: 'About us',
      email: 'contact@company.com',
      phone: '123-456-7890',
      address: '123 Main St'
    };

    const createdCompany = {
      ...newCompany,
      id: 'company-456',
      user_id: 'user-123',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    };

    mockSupabase.from().select().eq().single.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' }
    });

    mockSupabase.from().insert().select().single.mockResolvedValue({
      data: createdCompany,
      error: null
    });

    const { result } = renderHook(() => useCompany());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const company = await result.current.createCompany(newCompany);
    expect(company).toEqual(createdCompany);
  });
});