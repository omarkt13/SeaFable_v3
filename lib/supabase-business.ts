import { createClient } from "@/lib/supabase/client"
import type { BusinessSettings, HostAvailability, TeamMember } from "@/types/business"

const supabase = createClient()

export async function getHostProfile(userId: string) {
  const { data, error } = await supabase.from("host_profiles").select("*").eq("user_id", userId).single()

  if (error) throw error
  return data
}

export async function getBusinessSettings(hostProfileId: string) {
  const { data, error } = await supabase
    .from("host_business_settings")
    .select("*")
    .eq("host_profile_id", hostProfileId)
    .single()

  if (error) throw error
  return data
}

export async function updateBusinessSettings(hostProfileId: string, settings: Partial<BusinessSettings>) {
  const { data, error } = await supabase
    .from("host_business_settings")
    .upsert({
      host_profile_id: hostProfileId,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getHostEarnings(hostProfileId: string, startDate?: string, endDate?: string) {
  let query = supabase
    .from("host_earnings")
    .select(`
      *,
      bookings!host_earnings_booking_id_fkey(
        booking_date,
        experiences!bookings_experience_id_fkey(title)
      )
    `)
    .eq("host_profile_id", hostProfileId)
    .order("created_at", { ascending: false })

  if (startDate) {
    query = query.gte("created_at", startDate)
  }
  if (endDate) {
    query = query.lte("created_at", endDate)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getHostAvailability(hostProfileId: string, startDate?: string, endDate?: string) {
  let query = supabase
    .from("host_availability")
    .select("*")
    .eq("host_profile_id", hostProfileId)
    .order("date", { ascending: true })

  if (startDate) {
    query = query.gte("date", startDate)
  }
  if (endDate) {
    query = query.lte("date", endDate)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function setHostAvailability(hostProfileId: string, availability: HostAvailability[]) {
  // Delete existing availability for the dates
  const dates = availability.map((a) => a.date)
  await supabase.from("host_availability").delete().eq("host_profile_id", hostProfileId).in("date", dates)

  // Insert new availability
  const { data, error } = await supabase
    .from("host_availability")
    .insert(
      availability.map((a) => ({
        host_profile_id: hostProfileId,
        date: a.date,
        start_time: a.startTime,
        end_time: a.endTime,
        available_capacity: a.availableCapacity,
        price_override: a.priceOverride,
        notes: a.notes,
        weather_dependent: a.weatherDependent,
        is_recurring: a.isRecurring,
        recurring_pattern: a.recurringPattern,
      })),
    )
    .select()

  if (error) throw error
  return data
}

export async function getHostTeamMembers(hostProfileId: string) {
  const { data, error } = await supabase
    .from("host_team_members")
    .select(`
      *,
      users!host_team_members_user_id_fkey(
        first_name,
        last_name,
        email,
        avatar_url
      )
    `)
    .eq("host_profile_id", hostProfileId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function addTeamMember(
  hostProfileId: string,
  teamMember: Omit<TeamMember, "id" | "createdAt" | "updatedAt">,
) {
  const { data, error } = await supabase
    .from("host_team_members")
    .insert({
      host_profile_id: hostProfileId,
      user_id: teamMember.userId,
      role: teamMember.role,
      permissions: teamMember.permissions,
      hourly_rate: teamMember.hourlyRate,
      commission_rate: teamMember.commissionRate,
      certifications: teamMember.certifications,
      hire_date: teamMember.hireDate,
      notes: teamMember.notes,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getHostAnalytics(hostProfileId: string, days = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from("host_analytics")
    .select("*")
    .eq("host_profile_id", hostProfileId)
    .gte("date", startDate.toISOString().split("T")[0])
    .order("date", { ascending: false })

  if (error) throw error
  return data
}
