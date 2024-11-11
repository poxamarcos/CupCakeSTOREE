import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store';
import type { Cupcake } from '../types';

export function useCupcakes() {
  const [loading, setLoading] = useState(true);
  const { updateCupcakes } = useStore();

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const { data } = await supabase
          .from('cupcakes')
          .select('*')
          .order('created_at', { ascending: false });

        if (data) {
          updateCupcakes(data as Cupcake[]);
        }
      } catch (error) {
        console.error('Error fetching cupcakes:', error);
      } finally {
        setLoading(false);
      }
    };

    // Subscribe to changes
    const subscription = supabase
      .channel('public:cupcakes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'cupcakes' },
        fetchCupcakes
      )
      .subscribe();

    fetchCupcakes();

    return () => {
      subscription.unsubscribe();
    };
  }, [updateCupcakes]);

  return { loading };
}