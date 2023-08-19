package com.example.trial.models;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
    private LocalDate publish_date;
    private int vacancy;
    private String description;
    private String jobType;
    private String category;
    private String position;
//    private int experience;
//    private List<String> specialization=new ArrayList<>();
    private int salary;
    private LocalDate lastdate;
    
}