-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ideas table
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  source_url VARCHAR(500),
  source_country VARCHAR(100),
  original_idea TEXT,
  korean_adaptation TEXT,
  feasibility_score DECIMAL(3,2),
  confidence_score DECIMAL(3,2),
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(50) DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create user_interactions table
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create swarm_logs table
CREATE TABLE swarm_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_type VARCHAR(100) NOT NULL,
  task_id VARCHAR(255),
  input_data JSONB,
  output_data JSONB,
  confidence_score DECIMAL(3,2),
  processing_time_ms INTEGER,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create swarm_notifications table
CREATE TABLE swarm_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  priority VARCHAR(20) DEFAULT 'medium',
  channels TEXT[],
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_ideas_status ON ideas(status);
CREATE INDEX idx_ideas_category ON ideas(category);
CREATE INDEX idx_ideas_created_at ON ideas(created_at);
CREATE INDEX idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX idx_user_interactions_idea_id ON user_interactions(idea_id);
CREATE INDEX idx_swarm_logs_agent_type ON swarm_logs(agent_type);
CREATE INDEX idx_swarm_logs_created_at ON swarm_logs(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE swarm_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE swarm_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ideas table
CREATE POLICY "Public read access to approved ideas" ON ideas
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Authenticated users can view pending ideas" ON ideas
  FOR SELECT USING (auth.role() = 'authenticated' AND status IN ('pending', 'approved'));

CREATE POLICY "Admin users can manage all ideas" ON ideas
  FOR ALL USING (auth.role() = 'authenticated' AND auth.email() IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- RLS Policies for user_interactions table
CREATE POLICY "Users can manage their own interactions" ON user_interactions
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for swarm_logs table (admin only)
CREATE POLICY "Admin users can view swarm logs" ON swarm_logs
  FOR SELECT USING (auth.role() = 'authenticated' AND auth.email() IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- RLS Policies for swarm_notifications table (admin only)
CREATE POLICY "Admin users can manage notifications" ON swarm_notifications
  FOR ALL USING (auth.role() = 'authenticated' AND auth.email() IN (
    SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_ideas_updated_at BEFORE UPDATE ON ideas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 