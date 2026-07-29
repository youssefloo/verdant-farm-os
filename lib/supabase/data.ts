import { createClient } from "./client";

export async function getCurrentWorkspace() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;
  const { data, error } = await supabase
    .from("farm_members")
    .select("role, farms(*)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return { user, membership: data };
}

export async function createFarmWorkspace(input: {
  name: string;
  operationType: string;
  acreageBand: string;
  teamSize: number;
}) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("You must be signed in.");
  const { data: farm, error } = await supabase
    .from("farms")
    .insert({
      owner_id: user.id,
      name: input.name,
      operation_type: input.operationType,
      acreage_band: input.acreageBand,
      team_size: input.teamSize,
      country: "Canada",
      region: "Ontario",
    })
    .select()
    .single();
  if (error) throw error;
  return farm;
}

export async function listAnimals(farmId: string) {
  const { data, error } = await createClient()
    .from("animals")
    .select("*")
    .eq("farm_id", farmId)
    .is("archived_at", null)
    .order("display_name");
  if (error) throw error;
  return data;
}

export async function saveRecordNote(input: {
  farmId: string;
  entityType: string;
  entityId?: string;
  title: string;
  notes: string;
}) {
  const { error } = await createClient().from("activity_logs").insert({
    farm_id: input.farmId,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    action: "record_updated",
    title: input.title,
    details: { notes: input.notes },
  });
  if (error) throw error;
}
