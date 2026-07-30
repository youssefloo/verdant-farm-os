import { createClient } from "./client";

export async function getCurrentWorkspace() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;
  const { data, error } = await supabase.from("farm_members").select("role, farms(*)").eq("user_id", user.id).limit(1).maybeSingle();
  if (error) throw error;
  return { user, membership: data };
}

export async function createFarmWorkspace(input: {name:string; operationType:string; acreageBand:string; teamSize:number; country?:string; region?:string}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("You must be signed in.");
  const farmId = crypto.randomUUID();
  const { error } = await supabase.from("farms").insert({id:farmId, owner_id:user.id, name:input.name, operation_type:input.operationType, acreage_band:input.acreageBand, team_size:input.teamSize, country:input.country||"Canada", region:input.region||null});
  if (error) throw error;
  const { data, error: readError } = await supabase.from("farms").select("*").eq("id",farmId).single();
  if (readError) throw readError;
  return data;
}

export async function loadFarmData(farmId:string) {
  const client=createClient();
  const tables=["animals","employees","tasks","resource_readings","transactions","automations","activity_logs"] as const;
  const results=await Promise.all(tables.map(table=>client.from(table).select("*").eq("farm_id",farmId).order(table==="animals"?"created_at":table==="employees"?"created_at":table==="tasks"?"created_at":table==="resource_readings"?"recorded_at":table==="transactions"?"transaction_date":"created_at",{ascending:false}).limit(100)));
  const failed=results.find(result=>result.error); if(failed?.error) throw failed.error;
  return Object.fromEntries(tables.map((table,index)=>[table,results[index].data||[]]));
}

export async function createRecord(table:string, record:Record<string,unknown>) {
  const { data,error }=await createClient().from(table).insert(record).select().single();
  if(error) throw error; return data;
}

export async function updateRecord(table:string,id:string|number,changes:Record<string,unknown>) {
  const { data,error }=await createClient().from(table).update(changes).eq("id",id).select().single();
  if(error) throw error; return data;
}
