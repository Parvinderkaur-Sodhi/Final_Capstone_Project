package com.example.trial.models;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Set;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "Appliedjobs")
public class AppliedJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int applicationId;
    
    @OneToOne
    private Jobs job;
    
   private String status;
    
    @OneToOne
   private Employee emp;
    
}
