import { v4 as uuid } from 'uuid';

class InfectionReport {
  public readonly id: string;

  public reporter_id?: string;
  public reported_id?: string;

  public created_at: string;
  public updated_at?: string;

  constructor(props: Omit<InfectionReport, 'id'|'created_at'|'updated_at'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }

    this.created_at = new Date().toISOString();
  }
}

export default InfectionReport;