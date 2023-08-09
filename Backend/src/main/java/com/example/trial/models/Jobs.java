package com.example.trial.models;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "jobs")
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobId;
    private String jobProfile;
    private String publish_date;
    private int vacancy;
    private String description;
    private String jobType;
    private int salary;
    private String last_date;
}