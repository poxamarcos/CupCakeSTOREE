import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store';
import type { Order } from '../types';

export function useOrders() {
  const [loading, setLoading] = useState(true);
  const { user, updateOrders } = useStore();

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const { data } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              cupcake:cupcakes(*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) {
          updateOrders(data as Order[]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    // Subscribe to changes
    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` },
        fetchOrders
      )
      .subscribe();

    fetchOrders();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, updateOrders]);

  return { loading };
}